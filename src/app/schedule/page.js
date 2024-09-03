import React from 'react';

const Schedule = () => {
  const calendarEmbedCode = `
  <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FShanghai&bgcolor=%23ffffff&src=a2V4dTU2N0BnbWFpbC5jb20&src=NzYwOTljZGUzNjJhM2Y5ZjY1N2ZmNTIxYzJjN2FhOWIyMGI4NjJmMTI2NzI2M2VmYzM4YTlhMjNlMDViNzhmY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZmM0ZXJ0cmYzNG9mb2toZGQ2OHUzMnZ2ZjhidGtuNDFAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%233F51B5&color=%23E67C73&color=%23F4511E" style="border:none; border-radius:10px; box-shadow:0 4px 8px rgba(0,0,0,0.1); width:100%; height:600px; overflow:hidden;"></iframe>  
`;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Schedule</h1>
      <div className="bg-white p-4 rounded-lg shadow-md" dangerouslySetInnerHTML={{ __html: calendarEmbedCode }} />
    </div>
  );
};

export default Schedule;