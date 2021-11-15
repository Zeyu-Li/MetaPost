const PreviewPost = (props) => {
    return (
        <>
            <div style={{"display": "flex", "flexDirection": "column"}}>
                <img src={props.dataPreProcess.imgName} />
                <h1>{props.dataPreProcess.desc}</h1>
            </div>
        </>
        )
}

export default PreviewPost;