"use client"

export const ActivityTimeLines = () => { 
    const Activities = [
        {
            id:1,
            user:"pankaj ",
            task:"update Dashboard",
            action:"change from todo to update",
            detail : "completed tasks",
            createdAt:"22 jan 2025"
        },
        {
            id:2,
            user:"pankaj",
            task:"update Dashboard",
            action:"change from todo to update",
            detail : "completed tasks in werfdhdhgkkjhfdhgjfdgfjghjfgkfdkhgkfdhg",
            createdAt:"22 jan 2025"
        },
        {
            id:3,
            user:"pankaj ",
            task:"update Dashboard",
            action:"change from todo to update",
            detail : "completed tasks",
            createdAt:"22 jan 2025"
        },
        {
            id:4,
            user:"pankaj",
            task:"update Dashboard",
            action:"change from todo to update",
            detail : "completed tasks in werfdhdhgkkjhfdhgjfdgfjghjfgkfdkhgkfdhg",
            createdAt:"22 jan 2025"
        },
        {
            id:5,
            user:"pankaj ",
            task:"update Dashboard",
            action:"change from todo to update",
            detail : "completed tasks",
            createdAt:"22 jan 2025"
        },
        {
            id:6,
            user:"pankaj",
            task:"update Dashboard",
            action:"change from todo to update",
            detail : "completed tasks in werfdhdhgkkjhfdhgjfdgfjghjfgkfdkhgkfdhg",
            createdAt:"22 jan 2025"
        },
    ]
  return (
    <div className="">
        <h1 className="text-white text-lg font-semibold mb-2">Activity TImelines</h1>
        {Activities.map((activity) => (
            <div key={activity.id} className="bg-gray-700 rounded-xl p-1 hover:bg-gray-600 transition w-full my-1">
              <div className="bg-gray-700 rounded-xl p-2 hover:bg-gray-600 transition w-full mb-3">
                {/* Main Comment */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-purple-400">
                    {activity.user}
                  </span>
                  <span className="text-xs text-gray-500">{activity.createdAt}</span>
                </div>
                <p className="text-gray-300 text-sm font-semibold mb-1">{activity.task}</p>
                <p className="text-gray-300 text-sm mb-1">{activity.action}</p>
                <p className="text-gray-300 text-xs mb-1">{activity.detail}</p>
              </div>
 
        
            </div>
          ))}
    </div>
  )    
}