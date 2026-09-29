import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Upload,
  FileText,
  Layers,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database,
  Filter,
  Eye
} from 'lucide-react';
import { useWorkbench } from '../../context/WorkbenchContext';
import { KnowledgeDocument } from '../../types';

export const KnowledgeBaseView: React.FC = () => {
  const { documents, addDocument } = useWorkbench();

  const [searchQuery, setSearchQuery] = useState('wall thinning DHDS reactor SOP limits');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0].id);

  // Upload modal / trigger state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<KnowledgeDocument['category']>('SOP');
  const [uploadPages, setUploadPages] = useState('24');
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const filteredDocs = documents.filter(d => {
    if (selectedCategory !== 'ALL' && d.category !== selectedCategory) return false;
    return true;
  });

  // Simulated Semantic Search across chunks
  const searchResults = documents.flatMap(doc => {
    if (!doc.chunks) return [];
    return doc.chunks
      .filter(chunk => {
        if (!searchQuery.trim()) return true;
        const qTerms = searchQuery.toLowerCase().split(' ');
        return qTerms.some(t => chunk.text.toLowerCase().includes(t));
      })
      .map(chunk => ({
        docTitle: doc.title,
        docCategory: doc.category,
        page: chunk.page,
        text: chunk.text,
        similarityScore: 0.94 - Math.random() * 0.05,
        clearance: doc.clearanceLevel
      }));
  }).sort((a, b) => b.similarityScore - a.similarityScore);

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      addDocument({
        title: uploadTitle,
        category: uploadCategory,
        format: 'PDF',
        size: '5.2 MB',
        pageCount: parseInt(uploadPages, 10) || 10,
        sourceUnit: 'Refinery Plant Division',
        clearanceLevel: 'RESTRICTED',
        summary: `Standard operational documentation uploaded by engineer. Chunks generated via 512-token sliding window with BGE-M3 local vector embeddings.`,
        tags: [uploadCategory, 'Uploaded-Document', 'MRPL-Indexed']
      });
      setIsUploading(false);
      setShowUploadForm(false);
      setUploadTitle('');
    }, 1200);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-slate-50 text-slate-800">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
              Local Sovereign Knowledge Base & RAG Engine
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
              AIR-GAPPED INDEX
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Semantic document indexing with BAAI/bge-m3 embeddings.
            All confidential refinery procedures, NDT logs, and engineering standards remain on-premise.
          </p>
        </div>

        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="px-4 py-2 text-xs font-bold rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 font-sans"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Technical Document</span>
        </button>
      </div>

      {/* RAG Pipeline Diagram */}
      <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="text-xs font-mono uppercase text-blue-800 font-bold tracking-wider flex items-center justify-between">
          <span>Sovereign Local RAG Retrieval Pipeline</span>
          <span className="text-emerald-700 font-semibold">Zero Cloud Ingestion Active</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs font-mono">
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">1. Source</div>
            <div className="text-slate-800 font-bold mt-0.5">PDF / DOCX</div>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">2. Ingest</div>
            <div className="text-slate-800 font-bold mt-0.5">Local OCR</div>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">3. Chunking</div>
            <div className="text-slate-800 font-bold mt-0.5">512 Tokens</div>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">4. Embed</div>
            <div className="text-blue-700 font-bold mt-0.5">BGE-M3 (TEI)</div>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">5. Index</div>
            <div className="text-blue-700 font-bold mt-0.5">HNSW / BM25</div>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">6. Retrieve</div>
            <div className="text-slate-800 font-bold mt-0.5">Hybrid Rank</div>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">7. Ground</div>
            <div className="text-emerald-700 font-bold mt-0.5">Citations</div>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase font-semibold">8. Reason</div>
            <div className="text-blue-700 font-bold mt-0.5">Local LLM</div>
          </div>
        </div>
      </div>

      {/* Upload Form Modal / Drawer */}
      {showUploadForm && (
        <form
          onSubmit={handleSimulateUpload}
          className="p-5 rounded-lg bg-white border border-blue-400 shadow-sm space-y-4 animate-in fade-in"
        >
          <div className="text-xs font-bold text-slate-900 font-sans">
            Ingest Confidential Refinery Asset into Local Vector DB
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 mb-1 font-mono text-[11px] font-semibold">
                Document Title
              </label>
              <input
                type="text"
                required
                value={uploadTitle}
                onChange={e => setUploadTitle(e.target.value)}
                placeholder="e.g. MRPL-SOP-CRU-108: Desalter Protocol"
                className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1 font-mono text-[11px] font-semibold">
                Category
              </label>
              <select
                value={uploadCategory}
                onChange={e => setUploadCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value="SOP">Standard Operating Procedure (SOP)</option>
                <option value="INSPECTION_REPORT">Inspection Report</option>
                <option value="EQUIPMENT_MANUAL">Equipment Manual</option>
                <option value="SAFETY_STANDARD">Safety Standard</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 mb-1 font-mono text-[11px] font-semibold">
                Estimated Pages
              </label>
              <input
                type="number"
                value={uploadPages}
                onChange={e => setUploadPages(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowUploadForm(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-md cursor-pointer shadow-xs"
            >
              {isUploading ? 'Chunking & Indexing...' : 'Index Document Locally'}
            </button>
          </div>
        </form>
      )}

      {/* Main Content: Document Browser & Live Search */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Document Directory & Semantic Search */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search Box */}
          <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <Search className="w-4 h-4 text-blue-700 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search indexed refinery manuals, SOP clauses, or equipment tags..."
              className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-sans"
            />
          </div>

          {/* Search Results Display */}
          <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="font-semibold text-slate-700">Retrieved Excerpts ({searchResults.length} matches)</span>
              <span className="text-blue-700 font-semibold">Embedding: BGE-M3 Dense+Lexical</span>
            </div>

            <div className="space-y-2.5">
              {searchResults.length === 0 ? (
                <div className="p-4 rounded-md bg-slate-50 text-center text-xs text-slate-500 font-mono">
                  No matching passages found. Try broader keywords.
                </div>
              ) : (
                searchResults.slice(0, 3).map((res, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-blue-900 font-bold truncate">{res.docTitle}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Page {res.page}</span>
                        <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-bold">
                          Sim: {(res.similarityScore * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-700 leading-relaxed font-sans italic bg-white p-2.5 rounded border border-slate-200">
                      &ldquo;{res.text}&rdquo;
                    </p>

                    <div className="text-[10px] font-mono text-slate-500 flex items-center justify-between pt-0.5">
                      <span>Clearance: {res.clearance}</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Source Grounded</span>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Indexed Documents Table */}
          <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="text-xs font-mono uppercase text-slate-600 font-bold">
              All Indexed Technical Documents ({documents.length})
            </div>

            <div className="space-y-2">
              {filteredDocs.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start justify-between gap-3 text-xs ${
                    selectedDocId === doc.id
                      ? 'bg-blue-50/60 border-blue-400 shadow-xs ring-1 ring-blue-300'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1 truncate">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span className="font-bold text-slate-900 truncate font-sans">
                        {doc.title}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono truncate">
                      {doc.sourceUnit} · {doc.format} · {doc.pageCount} Pages · {doc.chunkCount} Chunks
                    </div>
                  </div>
                  <div className="shrink-0 text-right font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                      INDEXED
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Selected Document Inspector & Chunks */}
        <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-blue-800 font-bold">
                Document Chunk Inspector
              </span>
              <span className="text-[10px] font-mono text-slate-400">{selectedDoc.id}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-1 font-sans leading-tight">
              {selectedDoc.title}
            </h3>
          </div>

          <div className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1.5 text-[11px] font-mono text-slate-600">
            <div className="flex justify-between">
              <span>Category:</span>
              <span className="text-slate-900 font-semibold">{selectedDoc.category}</span>
            </div>
            <div className="flex justify-between">
              <span>Security Clearance:</span>
              <span className="text-amber-800 font-bold bg-amber-50 px-1 rounded border border-amber-200">{selectedDoc.clearanceLevel}</span>
            </div>
            <div className="flex justify-between">
              <span>Indexed Timestamp:</span>
              <span className="text-slate-800">{selectedDoc.indexedAt}</span>
            </div>
            <div className="flex justify-between">
              <span>Vector Chunks:</span>
              <span className="text-blue-800 font-bold">{selectedDoc.chunkCount} Chunks</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase text-slate-600 mb-2 font-bold">
              Representative Chunks & Embeddings
            </div>
            <div className="space-y-2">
              {selectedDoc.chunks?.map(chunk => (
                <div
                  key={chunk.id}
                  className="p-2.5 rounded-md bg-slate-50 border border-slate-200 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="font-semibold text-slate-700">Page {chunk.page} ({chunk.id})</span>
                    <span className="text-blue-700 font-bold">512 tokens</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed font-sans">
                    {chunk.text}
                  </p>
                  <div className="text-[9px] font-mono text-slate-400 truncate">
                    Embedding: [{chunk.embeddingPreview.map(v => v.toFixed(3)).join(', ')}, ...]
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
