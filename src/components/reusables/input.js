const AquaInput = ({ label, placeholder, handleChange, type, Address, value, name, maxlength, error }) => {
    return (
        <>
            {Address ? (
                <>
                    <div class="form-group mb-3 row row-cols-lg-auto g-1">
                        <label for="inputEmail3" class="col-sm-12 col-lg-4 col-md-4 col-xs-12 col-form-label">{label} : </label>
                        <div class="col-sm-12 col-lg-8 col-md-8 col-xs-12">
                            <textarea className="form-control" id="exampleFormControlTextarea1" type={type} value={value} rows="3" maxLength={maxlength} placeholder={placeholder} onChange={handleChange} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div class="form-inline mb-3 row row-cols-lg-auto g-1">
                        <label for="inputEmail3" class="col-sm-12 col-xs-12 col-md-4 col-lg-4 col-form-label">{label} : </label>
                        <div className="col-sm-12 col-xs-12 col-lg-8 col-md-8">
                            <input className="form-control" id="inputEmail3" placeholder={placeholder} onChange={handleChange} name={name} maxLength={maxlength} value={value} type={type} />
                        </div>
                    </div>
                </>
            )}

        </>
    )
}
export default AquaInput