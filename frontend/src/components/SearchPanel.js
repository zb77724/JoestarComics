export const SearchPanel = ({ search, setSearch }) => {

    return (
        <div className="searchPanelWrapper">
            <div className="searchPanel">
                <div className="wrapper searchPanelFlex">
                    <input
                    type="text"
                    placeholder="Search something"
                    className="searchBar"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    />
                </div>
            </div>
        </div>
    );

};