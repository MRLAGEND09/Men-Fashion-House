"use client";

import { useState } from 'react';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleTrack = async () => {
    setError('');
    setStatus('');

    if (!orderId.trim()) {
      setError('Please enter your Order ID');
      return;
    }

    try {
      const res = await fetch(`/api/track-order?orderId=${orderId.trim()}`);

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Order not found');
        return;
      }

      const data = await res.json();
      setStatus(`Your order status is: ${data.status}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Track Your Order</h1>
      <input
        type="text"
        placeholder="Enter your Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />
      <button onClick={handleTrack} style={{ padding: '8px 16px' }}>
        Track Order
      </button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      {status && <p style={{ color: 'green', marginTop: 10 }}>{status}</p>}
    </div>
  );
}
