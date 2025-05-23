import React, { useState } from 'react';

const Recommendation = () => {
  const [goal, setGoal] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetRecommendation = async () => {
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://localhost:5050/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Suggest a personalized 3-month learning path for someone who wants to ${goal}. Include key skills and recommended course topics.`
        })
      });

      console.log('Response status:', res.status);
      console.log('Response headers:', [...res.headers]);

      const data = await res.json();
      console.log('Response data:', data);

      // Combine text from all response objects
      const combinedOutput = data
        .map(entry => entry?.candidates?.[0]?.content?.parts?.[0]?.text || '')
        .join('')
        .trim();

      setResponse(combinedOutput || 'No response from Gemini.');
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      setResponse('An error occurred while fetching the recommendation.');
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">AI Career Path Recommendation</h2>

      <input
        type="text"
        placeholder="Enter your career goal (e.g., Become a Cloud Engineer)"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-md mb-4"
      />

      <button
        onClick={handleGetRecommendation}
        className="bg-blue-600 text-white px-6 py-3 rounded-md"
        disabled={loading || !goal}
      >
        {loading ? 'Generating...' : 'Get Recommendation'}
      </button>

      {response && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 whitespace-pre-wrap">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Recommended Learning Path:</h3>
          <p className="text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Recommendation;