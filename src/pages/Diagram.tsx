import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';

const learningStyles = [
  { id: 'visual', name: '👀 Visual' },
  { id: 'auditory', name: '🎧 Auditory' },
  { id: 'readWrite', name: '📖 Reading/Writing' },
  { id: 'kinesthetic', name: '🖐️ Kinesthetic' },
];

const DiagramGenerator = () => {
  const [query, setQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(learningStyles[0]);
  const [diagramUrl, setDiagramUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateDiagram = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setDiagramUrl(null);

    try {
      const response = await fetch('http://localhost:3005/diagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.message && data.message.image) {
        setDiagramUrl(data.message.image);
      } else {
        throw new Error('No diagram URL in response');
      }
    } catch (err: any) {
      console.error('Diagram generation error:', err);
      setError(err.message || 'Failed to generate diagram');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-32 pb-16 bg-gray-100">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Diagram Generator</h2>
        <form onSubmit={generateDiagram} className="space-y-6">
          {/* Textarea for input query */}
          <textarea
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Describe the concept for diagram generation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={4}
            required
          />

          {/* Custom Dropdown for Learning Style (or diagram preference in your case) */}
          <div>
            <label className="block mb-2 font-semibold">Preferred Learning Style:</label>
            <Listbox value={selectedStyle} onChange={setSelectedStyle}>
              <div className="relative">
                <Listbox.Button className="w-full bg-white border border-gray-300 rounded-lg shadow-md px-4 py-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  {selectedStyle.name}
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </Listbox.Button>

                <Listbox.Options className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
                  {learningStyles.map((style) => (
                    <Listbox.Option
                      key={style.id}
                      value={style}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-3 ${
                          active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                        } flex items-center justify-between`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span>{style.name}</span>
                          {selected && <Check className="h-5 w-5 text-white" />}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={isLoading || !query}
            className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Diagram'}
          </button>
        </form>

        {/* Error Handling */}
        {error && (
          <div className="mt-4 p-2 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}

        {/* Diagram Display */}
        {diagramUrl && (
          <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Generated Diagram</h3>
            <div className="prose max-w-none mb-6">
              <img src={diagramUrl} alt="Generated Diagram" className="max-w-full h-auto rounded" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiagramGenerator;
