import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Source {
  title: string;
  link: string;
  snippet?: string;
}

interface ResponseData {
  answer: string;
  sources?: Source[];
  followUpQuestions?: string[];
  varkStyle?: string;
}

const learningStyles = [
  { id: "visual", name: "👀 Visual" },
  { id: "auditory", name: "🎧 Auditory" },
  { id: "readWrite", name: "📖 Reading/Writing" },
  { id: "kinesthetic", name: "🖐️ Kinesthetic" },
];

const highlightKeywords = (text: string) => {
  const keywords = ["React", "JavaScript", "TypeScript", "API", "backend"]; // Customize these
  const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  
  return text.replace(regex, (match) => `**${match}**`); // Wrap in markdown bold (**bold**)
};

const QuerySection: React.FC = () => {
  const [message, setMessage] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(learningStyles[2]);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const submitQuery = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setResponseData(null);
    setMessage(query);

    try {
      const res = await fetch("http://localhost:3005/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          preferredStyle: selectedStyle.id,
          returnSources: true,
          returnFollowUpQuestions: true,
        }),
      });
      const data: ResponseData = await res.json();
      setResponseData(data);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setLoading(false);
  };

  return (
    <section className="pt-32 pb-16 bg-gray-100">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Ask Your Question</h2>
        <form onSubmit={(e) => { e.preventDefault(); submitQuery(message); }} className="space-y-6">
          <textarea
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter your question here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          />

          {/* Custom Dropdown */}
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
                          active ? "bg-indigo-500 text-white" : "text-gray-900"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>

        {responseData && (
          <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Response</h3>
            <div className="prose max-w-none mb-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {highlightKeywords(responseData.answer)}
              </ReactMarkdown>
            </div>

            {responseData.sources && responseData.sources.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-lg mb-2">Sources:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {responseData.sources.map((source, index) => (
                    <li key={index}>
                      <a
                        href={source.link}
                        className="text-indigo-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {responseData.followUpQuestions && responseData.followUpQuestions.length > 0 && (
              <div>
                <h4 className="font-semibold text-lg mb-2">Follow-Up Questions:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {responseData.followUpQuestions.map((q, index) => (
                    <li
                      key={index}
                      className="cursor-pointer text-indigo-600 hover:underline"
                      onClick={() => submitQuery(q)}
                    >
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuerySection;
