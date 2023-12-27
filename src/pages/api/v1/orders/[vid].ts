import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "@/pages/api/utils/db/db_browser";
import "@/pages/api/utils/patch/bigint_patch";
import "@/pages/api/utils/generation/generator"
import HttpCode from "@/pages/api/utils/http_code";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {method} = req;
    const {vid} = req.query;
    switch (method) {
        case "GET":
            // await prisma.b_goods_condition.findMany();
            await prisma.b_goods.findFirst({
                    where: {
                        status: {
                            not: 0
                        },
                    }
                }
            ).then((value:any) => {
                res.status(HttpCode.OK).json({code: HttpCode.OK, msg: "success", data: {data: value}});
            }).catch((reason:any) => {
                res.status(HttpCode.OK).json({code: 500, msg: "server error", data: {data: reason}});
            });
            break;
        case "PUT":
            const {name, img_url, remark, type, object_id, status, original_price, purchase_price} = req.body;
            await prisma.b_goods.update({
                where: {
                    view_id: `${vid}`,
                },
                data: {
                    name: `${name}`,
                    img_url: `${img_url}`,
                    original_price: original_price,
                    purchase_price: purchase_price,
                    type: type,
                    object_id: object_id,
                    status: status,
                    remark: `${remark}`,
                }
            }).then((value:any) => {
                res.status(HttpCode.OK).json({code: HttpCode.OK, msg: "success", data: {data: value}});
            }).catch((reason:any) => {
                res.status(HttpCode.OK).json({code: HttpCode.ERROR, msg: "server error", data: {data: reason}});
            });
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT"]);
            res.status(HttpCode.OK).json({code: HttpCode.ERROR_REQUEST_METHOD_CODE, msg: HttpCode.ERROR_REQUEST_METHOD_MSG, data: {}});
            break;
    }
}

