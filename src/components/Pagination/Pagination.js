import React from "react";
import { Link } from "react-router-dom";
import "./Pagi.scss";
import { GrNext, GrPrevious } from "react-icons/gr";
export const Pagination = ({ page, totalPage, path, count }) => {
  let startLoop = page;
  let diff = totalPage - page;
  if (diff <= 3) {
    startLoop = totalPage - 3;
  }
  let endLoop = startLoop + 3;
  if (startLoop <= 0) {
    startLoop = 1;
  }
  const links = () => {
    const allLinks = [];
    for (let i = startLoop; i <= endLoop; i++) {
      allLinks.push(
        <li key={i} className="pagination-item">
          <Link
            to={`/${path}/${i}`}
            className={`pagination-link ${page === i ? "selected" : ""}`}>
            {i}
          </Link>
        </li>
      );
    }
    return allLinks;
  };

  const next = () => {
    if (page < totalPage) {
      return (
        <li className="pagination-item btn-next">
          <Link to={`/${path}/${page + 1}`} className="pagination-link">
            <GrNext></GrNext>
          </Link>
        </li>
      );
    }
  };
  const prev = () => {
    if (page > 1) {
      return (
        <li className="pagination-item btn-prev">
          <Link to={`/${path}/${page - 1}`} className="pagination-link">
            <GrPrevious></GrPrevious>
          </Link>
        </li>
      );
    }
  };
  return (
    count >= totalPage && (
      <div className="mt-5 fui-basic-pagination">
        <ul className="pagination-list">
          {prev()}
          {links()}
          {next()}
        </ul>
      </div>
    )
  );
};
