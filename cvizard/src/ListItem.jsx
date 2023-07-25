export default function ListItem({id, name}) {
    return (
        <>
            <li key={id} className="flex justify-center gap-x-10 py-3 w-fit mx-auto px-4">
                <p className="text-sm font-semibold leading-6 text-gray-900">{name}</p>
                <button className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Delete</button>
            </li>
        </>
    )
}