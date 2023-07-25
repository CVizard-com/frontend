import { ListItem } from "./ListItem"

export default function List({files}) {
    return (
        <>
            
            <ul role="list" className="divide-y divide-slate-100 w-6/12 max-h-64 mx-auto overflow-auto rounded-md border-2 border-slate-100">
                {files.length === 0 && "No files uploaded yet!"}
                {files.map((file) => {
                    return (
                        <ListItem {...file}></ListItem>
                    )
                }
                )}
            </ul>
        </>
    )    
}