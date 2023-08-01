const GenreItem = ({ item, index }) => {

    return (
        <div className="genre-container" key={index}>
            {/* GENRE RANK AND LABEL */}
            <h2>{index+1}. {item[0]}</h2>
        </div>
    )
}

export default GenreItem;