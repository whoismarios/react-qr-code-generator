import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; 

function App() {
  const [url, setUrl] = useState('');
  const qrRef = useRef(null); 

  const generateAndDownloadQRCode = () => {
    if (url !== '') {
      const canvas = qrRef.current.querySelector('canvas');
      const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const link = document.createElement('a');
      link.href = image;
      link.download = 'qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Please enter a URL.');
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '300px', marginRight: '10px' }}
      />
      <button onClick={generateAndDownloadQRCode}>Generate and Download QR Code</button>
      <div ref={qrRef} style={{ display: 'none' }}>
        <QRCodeCanvas
          value={url}
          size={1024}
          bgColor={"rgba(0,0,0,0)"}
          fgColor={"#000000"}
          level={"H"}
        />
      </div>
    </div>
  );
}

export default App;
