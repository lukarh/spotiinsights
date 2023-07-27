const GenreItem = ({ item, index }) => {

    return (
        <div className="genre-container">
            {/* GENRE RANK AND LABEL */}
            <h2>{index+1}. {item[0]}</h2>
        </div>
    )
}

export default GenreItem;