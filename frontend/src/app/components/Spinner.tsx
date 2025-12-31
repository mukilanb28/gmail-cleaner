interface ISpinnerProps {
    percentage?: number;
    isMessageDeleting: boolean;
}

export function Spinner({ percentage, isMessageDeleting }: ISpinnerProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
            {/* Bigger spinner with overlay text */}
            <div className="relative w-18 h-18 flex items-center justify-center">




                {/* Background ring */}
                <div className="absolute inset-0 border-[5px] border-gray-200 rounded-full" />

                {/* Animated ring */}
                <div className="absolute inset-0 border-[5px] border-[#1a73e8] border-t-transparent rounded-full animate-spin" />

                {/* Center text */}
                {!isMessageDeleting && percentage !== undefined && (
                    <span className="z-10 text-base font-semibold text-[black]">
                        {percentage}%
                    </span>
                )}

            </div>


            <div
                className="text-sm font-semibold"
                style={{ color: 'black' }}
            >
                {isMessageDeleting ? "Deleting messages…" : "Loading messages…"}
            </div>



        </div>
    );
}
