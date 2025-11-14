import { TbEdit } from "react-icons/tb";
export default function Profile() {
    return (

        <div className="flex flex-col  h-full bg-accent p-4">
            <h1 className="text-2xl text-center font-bold mb-4">Student Profile</h1>
            <div className="p-4 w-full">
                <div className="grid grid-cols-1 w-full md:grid-cols-3 bg-white rounded-2xl p-6 gap-4 ">
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full mb-4">
                            <span className="text-gray-500">Logo</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <p className="text-sm font-semibold">Name: John Doe</p>
                        <p className="text-sm font-semibold">Email: john.doe@example.com</p>
                        <p className="text-sm font-semibold">Course: B.Tech Computer Science</p>
                        <p className="text-sm font-semibold">Year: 3rd Year</p>
                        
                    </div>
                    <div className="flex flex-col md:items-end mt-2">
                        <div className={`px-2 py-1 rounded-sm w-fit text-primary border border-primary flex items-center gap-2`}>
                            <TbEdit />
                            <span>Edit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}