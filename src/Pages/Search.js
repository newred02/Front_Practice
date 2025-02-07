import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import Button from "../components/ui/button";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

const Search = () => {
  const [books, setBooks] = useState([]); // 📌 책 리스트 (초기값: 빈 배열)
  const [loading, setLoading] = useState(false); // 📌 로딩 상태 (초기값: false)
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 📌 입력된 검색어
  const [selectedPageFilter, setSelectedPageFilter] = useState(""); // 📌 선택한 페이지 필터
  const [appliedPageFilter, setAppliedPageFilter] = useState(""); // 📌 실제 적용된 필터
  const [hasSearched, setHasSearched] = useState(false); // 📌 검색했는지 여부

  const fetchBooks = (searchQuery) => {
    if (!searchQuery) return; // 검색어가 없으면 요청하지 않음

    setLoading(true);
    fetch(`${API_URL}?q=${searchQuery}&maxResults=40&key=AIzaSyCOhxzEmFNG0E9GCrAAYeSQ8Q2NYrjC-b0`)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setBooks(data.items);
        } else {
          setBooks([]); // 검색 결과가 없으면 빈 배열 유지
        }
        setLoading(false);
        setHasSearched(true); // 📌 검색 완료 표시
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchTerm.trim()); // 검색 실행
    setAppliedPageFilter(selectedPageFilter); // 📌 필터 적용
  };

  // 📌 페이지 수 필터링 적용
  const filteredBooks = books.filter((book) => {
    const pageCount = book.volumeInfo.pageCount || 0;

    if (appliedPageFilter === "50") return pageCount <= 50;
    if (appliedPageFilter === "100") return pageCount <= 100;
    if (appliedPageFilter === "200") return pageCount <= 200;
    if (appliedPageFilter === "300") return pageCount <= 300;

    return true; // 전체 보기 선택 시 모든 도서 표시
  });

  return (
    <div className="p-4">
      {/* 🔍 검색 폼 */}
      <form onSubmit={handleSearch} className="mb-4 flex justify-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="책 검색..."
          className="border p-2 rounded-lg"
        />

        {/* 📌 드롭다운을 이용한 페이지 수 필터 */}
        <select
          value={selectedPageFilter}
          onChange={(e) => setSelectedPageFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">전체 보기</option>
          <option value="50">50쪽 이하</option>
          <option value="100">100쪽 이하</option>
          <option value="200">200쪽 이하</option>
          <option value="300">300쪽 이하</option>
        </select>

        <Button type="submit">검색</Button>
      </form>

      {/* 📌 검색 전에는 아무것도 보이지 않음 */}
      {hasSearched && (
        <>
          {loading && <p>Loading...</p>}
          {error && <p>Error loading books: {error.message}</p>}

          {/* 📚 책 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <Card key={index} className="p-4 border rounded-lg shadow-lg">
                  {book.volumeInfo.imageLinks ? (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                      className="w-full h-60 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-60 bg-gray-300 rounded-lg" />
                  )}
                  <CardContent>
                    <h2 className="text-xl font-semibold mt-2">{book.volumeInfo.title}</h2>
                    <p className="text-gray-600">
                      저자: {book.volumeInfo.authors?.join(", ") || "정보 없음"}
                    </p>
                    <p className="text-gray-600">
                      출판사: {book.volumeInfo.publisher || "정보 없음"}
                    </p>
                    <p className="text-gray-600">
                      쪽수: {book.volumeInfo.pageCount || "정보 없음"}
                    </p>
                    <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                      <Button className="mt-2">자세히 보기</Button>
                    </a>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-600">검색 결과가 없습니다.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
