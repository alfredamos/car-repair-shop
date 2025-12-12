export default async function JobCompletedPage({params}:{params:Promise<{id:string}>}){
    //----> Get the id from params.
    const {id} = await params;

    return (
        <div>Job completed page! with id : {id}</div>
    );
}