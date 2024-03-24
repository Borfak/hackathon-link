import React, { useState, useEffect } from 'react';

const mockData = [
  { originalLink: 'https://facebook.com', shortLink: 'https://short.ly/6ki149y', clicks: 67 },
    { originalLink: 'https://youtube.com', shortLink: 'https://short.ly/fs4cldv', clicks: 93 }
];

export default function LinkShortener() {
  const [link, setLink] = useState('');
  const [links, setLinks] = useState(mockData);
  const [error, setError] = useState('');

  const shortenLink = () => {
    if (!link.trim()) {
      setError('Please enter a link');
      return;
    }

    try {
      new URL(link);
    } catch (_) {
      setError('Please enter a valid link');
      return;
    }

    const shortLink = `https://short.ly/${Math.random().toString(36).substr(2, 7)}`;
    const newLink = { originalLink: link, shortLink, clicks: 0 };

    setLinks([...links, newLink]);
    setLink('');
    setError('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLinks((prevLinks) =>
        prevLinks.map((link) => ({
          ...link,
          clicks: link.clicks + Math.floor(Math.random() * 5), 
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-purple-50">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-4">
          <input
            type="text"
            className="input input-bordered w-full my-2 p-2 text-black"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Paste your link here"
            style={{ borderColor: '#a855f7' }}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="btn w-full mt-2 bg-purple-500 hover:bg-purple-700 text-white rounded-lg p-2 shadow"
            onClick={shortenLink}
          >
            Short URL
          </button>
        </div>
        {links.length > 0 && (
          <div className="overflow-x-auto mt-6">
            <table className="table w-full text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-purple-100">
                <tr>
                  <th className="py-3 px-6">Original Link</th>
                  <th className="py-3 px-6">Shortened Link</th>
                  <th className="py-3 px-6">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {links.map((item, index) => (
                  <tr className="bg-white border-b" key={index}>
                    <td className="py-4 px-6">{item.originalLink}</td>
                    <td className="py-4 px-6">
                      <a href={item.shortLink} className="text-purple-600 hover:text-purple-900">{item.shortLink}</a>
                    </td>
                    <td className="py-4 px-6">{item.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}