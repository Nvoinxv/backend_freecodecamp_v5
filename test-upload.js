const http = require('http');
const fs = require('fs');

const boundary = '----TestBoundary';
const fileContent = fs.readFileSync('package.json');
const fileName = 'package.json';

let body = '';
body += '--' + boundary + '\r\n';
body += 'Content-Disposition: form-data; name="upfile"; filename="' + fileName + '"\r\n';
body += 'Content-Type: application/json\r\n\r\n';

const bodyEnd = '\r\n--' + boundary + '--\r\n';
const bodyBuffer = Buffer.concat([Buffer.from(body), fileContent, Buffer.from(bodyEnd)]);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/fileanalyse',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': bodyBuffer.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Response:', data);
    const parsed = JSON.parse(data);
    console.log('Has name?', 'name' in parsed);
    console.log('Has type?', 'type' in parsed);
    console.log('Has size?', 'size' in parsed);
    console.log('name value:', parsed.name);
    console.log('type value:', parsed.type);
    console.log('size value:', parsed.size);
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(bodyBuffer);
req.end();
