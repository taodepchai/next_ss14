import axios from 'axios';
import React from 'react';

interface ErrorHandlingPageProps {
  data: any; // Replace `any` with the appropriate type if you know the data structure
  error: string | null;
}

const ErrorHandlingPage = async () => {
  let data = null;
  let error: string | null = null;

  try {
    const res = await axios.get('https://example.com/invalid-endpoint');
    data = res.data;
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 404) {
        error = 'Lỗi 404: Không tìm thấy tài nguyên.';
      } else if (err.response.status === 500) {
        error = 'Lỗi 500: Lỗi server nội bộ.';
      } else {
        error = `Lỗi ${err.response.status}: ${err.response.statusText}`;
      }
    } else if (err.request) {
      error = 'Không có phản hồi từ server. Vui lòng kiểm tra kết nối internet của bạn.';
    } else {
      error = 'Lỗi thiết lập yêu cầu. Vui lòng thử lại sau.';
    }
  }

  return (
    <div>
      <h1>Gọi API với xử lý lỗi</h1>
      {error ? (
        <div style={{ color: 'red' }}>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <h2>Dữ liệu từ API:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ErrorHandlingPage;
