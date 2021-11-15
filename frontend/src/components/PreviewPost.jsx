const PreviewPost = (props) => {
    return (
        <>
            <div style={{"display": "flex", "flexDirection": "column"}}>
                <img src={"http://localhost:3005/api/get_image/" + props.dataPreProcess.filename} alt={""}
                style={{"height":500, "width": 500}}/>
                <h1>{props.dataPreProcess.fileDescription}</h1>
                <h2>{props.dataPreProcess.caption}</h2>
            </div>
        </>
        )
}

export default PreviewPost;