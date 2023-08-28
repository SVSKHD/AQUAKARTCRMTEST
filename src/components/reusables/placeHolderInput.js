const AquaPlaceHolderInput = ({ placeholder, handleChange, }) => {
    return (
        <>
            <div className="mb-1">
                <input type="text" class="form-control" placeholder={placeholder} onChange={handleChange} />
            </div>
        </>
    )
}
export default AquaPlaceHolderInput