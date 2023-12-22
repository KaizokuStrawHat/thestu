export default function ClassForm({handleChange, errors, startTimeFormatFlag, endTimeFormatFlag, formData}){
    return(
        <>
            <div className={`${errors.categoryRadio ? 'border-red-500' : ''}`}>
                <h1 className="font-semibold">Category</h1>
                <label className="flex gap-4">
                    Drop-In
                    <input type="radio" id="drop-in" name="categoryRadio" value="Drop-In" checked={formData.categoryRadio === 'Drop-In'} onChange={handleChange} />
                </label>
                <label className="flex gap-4">
                    Program
                    <input type="radio" id="program" name="categoryRadio" value="Program" checked={formData.categoryRadio === 'Program'} onChange={handleChange} />
                </label>
                <label className="flex gap-4">
                    Workshop
                    <input type="radio" id="workshop" name="categoryRadio" value="Workshop" checked={formData.categoryRadio === 'Workshop'} onChange={handleChange} />
                </label>
                {errors.categoryRadio && <p className="text-red-500">Select a Category.</p>}
            </div>
            <div className={`col-span-2 ${errors.levelRadio ? 'border-red-500' : ''}`}>
                <h1 className="font-semibold">Level</h1>
                <label className="flex gap-4">
                    Beginner
                    <input type="radio" id="beginner" name="levelRadio" value="Beginner" checked={formData.levelRadio === 'Beginner'} onChange={handleChange} />
                </label>
                <label className="flex gap-4">
                    Intermediate
                    <input type="radio" id="intermediate" name="levelRadio" value="Intermediate" checked={formData.levelRadio === 'Intermediate'} onChange={handleChange} />
                </label>
                <label className="flex gap-4">
                    Advance
                    <input type="radio" id="advance" name="levelRadio" value="Advance" checked={formData.levelRadio === 'Advance'} onChange={handleChange} />
                </label>
                {errors.levelRadio && <p className="text-red-500">Select a level</p>}
            </div>
            <label>
                Studio
                <input
                    type='text'
                    name='studioTextbox'
                    className={`border p-4 rounded w-26 flex items-center space-x-4 text-black ${errors.studioTextbox ? 'border-red-500' : ''}`}
                    onChange={handleChange}
                    value={formData.studioTextbox}
                />
                {errors.studioTextbox && <p className="text-red-500">Studio is required.</p>}
            </label>
            <label>
                Start Time
                <input
                    type='text'
                    name='startTimeTextbox'
                    className={`border p-4 rounded w-26 flex items-center space-x-4 text-black ${errors.startTimeTextbox ? 'border-red-500' : ''}`}
                    onChange={handleChange}
                    value={formData.startTimeTextbox}
                />
                {
                    (errors.startTimeTextbox) ? (
                        <p className="text-red-500">Start time is required</p>
                    ) : (startTimeFormatFlag === false) ? (
                        <p className="text-red-500">Must use AM/PM format. (e.g '10:00 PM' or '12:00 AM')</p>
                    ) : (null)
                }
            </label>
            <label>
                End Time
                <input
                    type='text'
                    name='endTimeTextbox'
                    className={`border p-4 rounded w-26 flex items-center space-x-4 text-black ${errors.endTimeTextbox ? 'border-red-500' : ''}`}
                    onChange={handleChange}
                    value={formData.endTimeTextbox}
                />
                {
                (errors.endTimeTextbox) ? (
                    <p className="text-red-500">End time is required</p>
                ) : (endTimeFormatFlag === false) ? (
                    <p className="text-red-500">Must use AM/PM format. (e.g '10:00 PM' or '12:00 AM')</p>
                ) : (null)
            }
            </label>
            <label className="col-span-2">
                Teacher
                <input
                    type='text'
                    name='teacherTextbox'
                    className={`border p-4 rounded w-26 flex items-center space-x-4 text-black ${errors.teacherTextbox ? 'border-red-500' : ''}`}
                    onChange={handleChange}
                    value={formData.teacherTextbox}
                />
                {errors.teacherTextbox && <p className="text-red-500">Teacher is required.</p>}
            </label>

        </>
    )
}