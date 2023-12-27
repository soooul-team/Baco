import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "@/pages/api/utils/db/db_browser";
import "@/pages/api/utils/patch/bigint_patch";
import "@/pages/api/utils/generation/generator"
import Generator from "@/pages/api/utils/generation/generator";
import HttpCode from "@/pages/api/utils/http_code";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {method} = req;
    switch (method) {
        case "GET":
            await  prisma.b_order.findMany({
                    where: {
                        status: {
                            not: 0
                        }
                    }
                }
            ).then((value:any) => {
                res.status(HttpCode.OK).json({code: HttpCode.OK, msg: "success", data: {data: value}});
            }).catch((reason:any) => {
                res.status(HttpCode.OK).json({code: 500, msg: "server error", data: {data: reason}});
            });
            break;
        case "POST":
            const {img_url, name, remark, type, object_id, original_price, purchase_price} = req.body;
            let new_view_id = Generator.viewIdGenerate();
            await prisma.b_goods.create({
                data: {
                    view_id: new_view_id,
                    name: `${name}`,
                    img_url: `${img_url}`,
                    type: type,
                    original_price: original_price,
                    purchase_price: purchase_price,
                    object_id: object_id,
                    remark: `${remark}`,
                    status: 1,
                }
            }).then((value:any) => {
                res.status(HttpCode.OK).json({code: HttpCode.OK, msg: "success", data: {data: value}});
            }).catch((reason:any) => {
                res.status(HttpCode.OK).json({code: 500, msg: "server error", data: {data: reason}});
            });
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(HttpCode.OK).json({code: HttpCode.ERROR_REQUEST_METHOD_CODE, msg: HttpCode.ERROR_REQUEST_METHOD_MSG, data: {}});
            break;
    }
}
