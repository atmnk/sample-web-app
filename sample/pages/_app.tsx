import App, {AppInitialProps} from 'next/app'
import { Provider } from 'react-redux'
import withRedux, {AppProps} from 'next-redux-wrapper'
import { initStore } from '../store'
import cookie from 'js-cookie'
import {Router} from "next/router";
import {check} from "./api/user/profile";
import {LOGGED_IN, MY_DETAILS_LOADED} from "../states/actions";
import {NextPageContext} from "next";
import {Store} from "redux";
interface MyAppProps extends AppInitialProps, AppProps {}
import "../index.scss"
export interface SamplePageContext extends NextPageContext{
    store:Store;
    isServer:boolean
}
class SampleApp extends App<MyAppProps> {
    static async getInitialProps({ Component, ctx,router }) {
        let username=null
        if(ctx.isServer){
            username=check(checkServerSideCookie(ctx))
            if(username){
                ctx.store.dispatch({ type: LOGGED_IN, username: username})
            }
        }
        return {
            pageProps: (Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {})

        }
    }
    static isOnPage(ctx:any,router:Router,uri:string):boolean{
        if(ctx.req){
            return ctx.url==uri
        } else {
            return router.pathname == uri
        }
    }
    static isOnPath(ctx:any,router:Router,uri:string):boolean{
        if(ctx.req){
            return ctx.req.url.startsWith(uri)
        } else {
            return router.pathname.startsWith(uri)
        }
    }
    render() {
        const { Component, pageProps, store } = this.props
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}
export const checkServerSideCookie = (ctx) => {
    if (ctx.isServer) {
        if (ctx.req.headers.cookie) {
            const token = getCookie('token', ctx.req);
            return token
        }
    } else {
        const token = getCookie('token', ctx.req);
        return token
    }
    return null
};
export const getCookie = (key, req) => {
    return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = key => {
    return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split('=')[1];
};

export default withRedux(initStore)(SampleApp)