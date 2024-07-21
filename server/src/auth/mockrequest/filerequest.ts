import { Readable } from 'stream';

// Function to create a readable stream from a buffer
const bufferToStream = (buffer: Buffer): Readable => {
  const readable = new Readable();
  readable._read = () => {}; // _read is required but you can mock it
  readable.push(buffer);
  readable.push(null);
  return readable;
};

// Mock file data
const mockFile: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'mockfile.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    size: 12345,
    buffer: Buffer.from('Mock file content'),
    destination: '/path/to/destination',
    filename: 'mockfile.jpg',
    path: '/path/to/destination/mockfile.jpg',
    stream: null, // You can optionally provide a ReadableStream here
};

// Optionally, if your application expects a readable stream for file upload
mockFile.stream = bufferToStream(mockFile.buffer);

export default mockFile;
