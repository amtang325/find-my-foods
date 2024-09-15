import "./SearchResult.css";

export const SearchResult = ({ result }) => {
    return (
        <div
            className="search-result"
            onClick={(e) => alert(`You selected ${result.first_name}!`)}
        >
            {result.first_name} {result.last_name}
        </div>
    );
};