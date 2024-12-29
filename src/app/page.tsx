'use client'

import { BrowserMultiFormatReader } from '@zxing/browser';
import { useEffect, useRef, useState } from 'react';
export default function Home() {
  const videoRef = useRef(null); // Камераас видеог харуулах
  const [barcodeResult, setBarcodeResult] = useState<string>(''); // Уншсан бар код хадгалах
  const codeReader = useRef(null); // ZXing уншигч

  useEffect(() => {
    // ZXing код уншигч эхлүүлэх
    codeReader.current = new BrowserMultiFormatReader();

    // Камераас видео эх сурвалж авах
    if (videoRef.current) {
      codeReader.current
        .decodeFromVideoDevice(null, videoRef.current, (result, err) => {
          if (result) {
            console.log(result)
            setBarcodeResult(result.getText()); // Уншсан кодыг хадгална
          }
          if (err && !(err.name === 'NotFoundException')) {
            console.error(err); // Бусад алдааг лог руу бичнэ
          }
        });
    }


    return () => {
      // Камераас урсгалыг унтраах
      if (codeReader.current) {
        codeReader.current.reset();
      }
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Бар код уншигч</h1>
      <video
        ref={videoRef}
        style={{
          width: '100%',
          maxWidth: '500px',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      />
      <div style={{ marginTop: '20px', fontSize: '18px' }}>
        <strong>Уншсан код:</strong> {barcodeResult || 'Код олдоогүй байна'}
      </div>
    </div>
  );
}
