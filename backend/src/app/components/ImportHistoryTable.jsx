"use client";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/importLogRoutes";

export default function ImportHistoryTable() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}?page=${page}`);
      const data = await res.json();
      setLogs(data || []);
    } catch (error) {
      console.error("Failed to fetch logs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full font-poppins">
      <div className="container mx-auto max-w-[1140px]">
        <h2 className="text-xl font-semibold mb-4">
          Import History
        </h2>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="h-7 w-7 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
          </div>
        )}

        {!loading && (
          <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full text-[15px]">
                <thead className="bg-gray-100 text-gray-600 text-base">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">
                      fileName
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      importDateTime
                    </th>
                    <th className="px-4 py-3 text-center font-medium">
                      total
                    </th>
                    <th className="px-4 py-3 text-center font-medium">
                      new
                    </th>
                    <th className="px-4 py-3 text-center font-medium">
                      updated
                    </th>
                    <th className="px-4 py-3 text-center font-medium">
                      failed
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {logs.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-8 text-gray-400 text-base"
                      >
                        No import history found
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr
                        key={log._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3 text-gray-700 truncate max-w-xs text-[15px]">
                          {log.fileName}
                        </td>

                        <td className="px-4 py-3 text-gray-500 text-[15px]">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>

                        <td className="px-4 py-3 text-center text-orange-500 font-semibold text-base">
                          {log.totalFetched}
                        </td>

                        <td className="px-4 py-3 text-center text-green-600 font-semibold text-base">
                          {log.newJobs}
                        </td>

                        <td className="px-4 py-3 text-center text-blue-600 font-semibold text-base">
                          {log.updatedJobs}
                        </td>

                        <td className="px-4 py-3 text-center text-gray-600 font-semibold text-base">
                          {log.failedJobs}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm border rounded disabled:opacity-40"
              >
                Prev
              </button>

              <span className="text-base text-gray-600">
                Page {page}
              </span>

              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 text-sm border rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
