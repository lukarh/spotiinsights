const GenreItem = (item, index) => {

    return (
        <div style={{
            display: "flex", alignItems: "center", boxShadow: "0px 4px 4px 4px rgb(0,0,0,0.35)",
            width: "400px", height: "75px", backgroundColor: "#5358C3", borderRadius: "10px", margin: "1rem" }}>
            <h2 style={{ marginLeft: "15px" }}>{index+1} /  {item[0]}</h2>
        </div>
    )
}

export default GenreItem;