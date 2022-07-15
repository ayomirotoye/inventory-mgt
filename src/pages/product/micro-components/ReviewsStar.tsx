import { Fragment } from "react";
import colors from "tailwindcss/colors";
import { RatingsIcon } from "../../../components/icons/RatingsIcon";
import { magicLoop } from "../../../libs/helper";

export default function ReviewsStar({ rating }: any) {
    return (
        <div className="flex justify-end">
            {
                magicLoop(rating).map((index:number) => {
                    return  <Fragment key={`ratingsicon_${index}` }>
                        <RatingsIcon fill={colors.red[900]} className="w-5 h-5" />
                    </Fragment>
                })
            }
        </div>

    )
}