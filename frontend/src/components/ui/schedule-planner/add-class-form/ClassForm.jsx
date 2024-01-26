export default function ClassForm({handleChange, errors, isStartTimeValid, isEndTimeValid, formData, isSameTime}){
    return(
        <>
            <div className={`${errors.category ? 'border-red-500' : ''}`}>
                <h1 className="font-semibold">Category</h1>
                <label className="flex gap-4">
                    Drop-In
                    <input type="radio" id="drop-in" name="category" value="Drop-In" checked={formData.category === 'Drop-In'} onChange={handleChange} />
                </label>
                <label className="flex gap-4">
                    Program
                    <input type="radio" id="program" name="category" value="Program" checked={formData.category === 'Program'} onChange={handleChange} />
                </label>
                <label className="flex gap-4">
                    Workshop
                    <input type="radio" id="workshop" name="category" value="Workshop" checked={formData.category === 'Workshop'} onChange={handleChange} />
                </label>
                {errors.category && <p className="text-red-500">Select a Category.</p>}
            </div>
            <div className={`col-span-2 ${errors.level ? 'border-red-500' : ''}`}>
                <h1 className="font-semibold">Level</h1>
                <label className="flex gap-4">
                    Beginner
                    <input type="radio" id="beginner" name="level" value="Beginner" checked={formData.level === 'Beginner'} onChange={handleChange} />
                </label>
                <label className="flex gap-4">
                    Intermediate
                    <input type="radio" id="intermediate" name="level" value="Intermediate" checked={formData.level === 'Intermediate'} onChange={handleChange} />
                </label>
                <label className="flex gap-4">
                    Advance
                    <input type="radio" id="advance" name="level" value="Advance" checked={formData.level === 'Advance'} onChange={handleChange} />
                </label>
                {errors.level && <p className="text-red-500">Select a level</p>}
            </div>
            <label>
                Studio
                <input
                    type='text'
                    name='studio'
                    className={`border p-4 rounded w-26 flex items-center space-x-4 text-black ${errors.studio ? 'border-red-500' : ''}`}
                    onChange={handleChange}
                    value={formData.studio}
                />
                {errors.studio && <p className="text-red-500">Studio is required.</p>}
            </label>
            <label>
                Start Time
                <input
                    type='text'
                    name='startTime'
                    className={`border p-4 rounded w-26 flex items-center space-x-4 text-black ${errors.startTime ? 'border-red-500' : ''}`}
                    onChange={handleChange}
                    value={formData.startTime}
                />
                {
                    (errors.startTime) ? (
                        <p className="text-red-500">Start time is required</p>
                    ) : (isStartTimeValid === false) ? (
                        <p className="text-red-500">Must use AM/PM format. (e.g '10:00 PM' or '12:00 AM')</p>
                    ) : (isSameTime === true) ? (
                        <p className="text-red-500">Invalid Time</p>
                    ) : (null)
                }
            </label>
            <label>
                End Time
                <input
                    type='text'
                    name='endTime'
                    className={`border p-4 rounded w-26 flex items-center space-x-4 text-black ${errors.endTime ? 'border-red-500' : ''}`}
                    onChange={handleChange}
                    value={formData.endTime}
                />
                {
                (errors.endTime) ? (
                    <p className="text-red-500">End time is required</p>
                ) : (isEndTimeValid === false) ? (
                    <p className="text-red-500">Must use AM/PM format. (e.g '10:00 PM' or '12:00 AM')</p>
                ) : (isSameTime === true) ? (
                    <p className="text-red-500">Invalid Time</p>
                ) : (null)
            }
            </label>
            <label className="col-span-2">
                Teacher
                <input
                    type='text'
                    name='teacher'
                    className={`border p-4 rounded w-26 flex items-center space-x-4 text-black ${errors.teacher ? 'border-red-500' : ''}`}
                    onChange={handleChange}
                    value={formData.teacher}
                />
                {errors.teacher && <p className="text-red-500">Teacher is required.</p>}
            </label>
        </>
    )
}