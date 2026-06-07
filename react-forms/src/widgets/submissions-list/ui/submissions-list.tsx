import { useAppSelector } from "@/shared";

export const SubmissionsList = () => {
    const submissions = useAppSelector((state) => state.submission.items);

    if(!submissions.length) {
        return <p className="text-center text-gray-500">No submissions yet.</p>;
    }

    return (
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {submissions.map((submission) => (
                <article 
                key={submission.id} 
                className="rounded-xl border bg-card p-4 shadow"
                >
                    {submission.image && (
                        <img 
                        src={submission.image}
                        alt={submission.name}
                        className="mb-4 h-48 w-full rounded-lg object-cover"
                        />
                    )}

                    <h3>{submission.name}</h3>
                    <p>{submission.age}</p>
                    <p>{submission.email}</p>
                    <p>{submission.gender}</p>
                    <p>{submission.country}</p>
                </article>
            ))}
        </div>
    );
}