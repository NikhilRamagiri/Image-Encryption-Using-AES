const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('');
const port = process.env.PORT || 8080;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's origin
};

app.use(cors(corsOptions));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: '', // Replace with your Firebase Storage bucket name
});

const bucket = admin.storage().bucket();

// Multer middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Encryption function using AES
function encrypt(buffer, secretKey, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
  const encryptedBuffer = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return encryptedBuffer;
}

// Decryption function using AES
function decrypt(buffer, secretKey, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
  const decryptedBuffer = Buffer.concat([decipher.update(buffer), decipher.final()]);
  return decryptedBuffer;
}

// API endpoint for encrypting and uploading an image
app.post('/api/encrypt/:text', upload.single('image'), async (req, res) => {
  const { text } = req.params;
  const imageBuffer = req.file.buffer;
  const filename = req.file.originalname;
  try {
    // Generate a random IV (Initialization Vector)
    const iv = crypto.randomBytes(16);
    const hashedPassphrase = crypto.createHash('sha256').update(text).digest();
    const key16Bytes = hashedPassphrase.subarray(0, 16);
    const secretKey = key16Bytes.toString('hex');
    console.log(secretKey);
    
    // Encrypt the image
    const encryptedImage = encrypt(imageBuffer, secretKey, iv);

    // Generate a unique filename
    

    // Upload the encrypted image to Firebase Storage
    const file = bucket.file(`images/${filename}.enc`);
    await file.save(Buffer.concat([iv, encryptedImage]), {
      metadata: {
        contentType: 'image/jpg', // Change the content type as needed
      },
    });

    res.json({ secretKey });
    
  } catch (error) {
    console.error('Error encrypting and uploading image:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint for downloading and decrypting an image
app.get('/api/decrypt/:filename/:secretKey', async (req, res) => {
  const { filename, secretKey } = req.params;

  try {
    // Download the encrypted image from Firebase Storage
    const file = bucket.file(`images/${filename}.enc`);
    const [content] = await file.download();

    // Extract the IV and the encrypted image
    const iv = content.subarray(0, 16);
    const encryptedImage = content.subarray(16);

    // Decrypt the image
    const decryptedImage = decrypt(encryptedImage, secretKey, iv);

    res.setHeader('Content-Type', 'image/jpg'); // Change the content type as needed
    res.send(decryptedImage);
  } catch (error) {
    console.error('Error decrypting and downloading image:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/getImageList', async (req, res) => {
  try {
    // List all files in the "images" folder in Firebase Storage
    const [files] = await bucket.getFiles({ prefix: 'images/' });
    
    // Extract filenames from the list of files
    const filenames = files.map((file) => {
      const parts = file.name.split('/');
      return parts[parts.length - 1].replace('.enc', ''); // Remove the file extension
    });

    res.json(filenames);
  } catch (error) {
    console.error('Error fetching image list:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
