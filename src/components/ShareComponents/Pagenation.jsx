import React, { useEffect, useState } from "react";

const Pagenation = ({ array, setReturnArray, perpage = 5 }) => {
  // console.log(array);

  const [currentPage, setCurrentPage] = useState(1);
  const toatlPage = Math.ceil(array.length / perpage);

  const lastIndex = currentPage * perpage;
  const firstIndex = lastIndex - perpage;

  useEffect(() => {
    const currentUsers = array.slice(firstIndex, lastIndex);
    setReturnArray(currentUsers);
  }, [array, currentPage]);

  return (
    <div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: toatlPage }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === pageNum ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagenation;
