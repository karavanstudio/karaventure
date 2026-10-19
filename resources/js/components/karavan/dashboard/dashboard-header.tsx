export default function DashboardHeader() {
    return (
        <div className="flex justify-between items-center gap-2">
            <div className='flex flex-col items-start'>
                <h1 className="text-3xl font-bold">
                    Analytics Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Monitor trending places in Karaventure
                </p>
            </div>
        </div>
    )
}