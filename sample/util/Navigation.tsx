import Router from "next/router";
export function redirectTo(
    destination: any,
    { res, status }: any = {}
): void {
    if (res) {
        res.writeHead(status || 302, { Location: destination });
        res.end();
    } else{
        Router.push(destination);
    }
}

export default function redirectToPage(destination:string) {

    const Page = () => {
    }
    Page.getInitialProps = (ctx) => {
        redirectTo(destination,{ res: ctx.res, status: 301 })
    }
    return Page
}