import { RatingsIcon } from "../../components/icons/RatingsIcon";
import { magicLoop } from "../../libs/helper";
import { theme } from "../../tailwind.config";

export default function ReviewsStar({ rating }: any) {
    return (
        <div className="flex justify-end">
            {
                magicLoop(rating).map(() => {
                    return <RatingsIcon fill={theme.extend.colors.primary[900]} className="w-5 h-5" />
                })
            }
        </div>

    )
}