const PreviewPost = (props) => {
    return (
        <>
            <div style={{"display": "flex", "flexDirection": "column"}}>
                <img src={"http://localhost:3005/api/get_image/" + props.dataPreProcess.filename} />
                <h1>{props.dataPreProcess.description}</h1>
            </div>
        </>
        )
}

export default PreviewPost;