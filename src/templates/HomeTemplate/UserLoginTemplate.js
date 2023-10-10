import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom';
import { Layout } from 'antd';
// import { Content } from 'antd/es/layout/layout';

const { Content, Sider } = Layout;

export default function UserLoginTemplate(props) {

    const [{ width, height }, setSize] = useState({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight)
    });

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight)
            })
        }
    }, [])
    // console.log(width, ' ', height);
    let { Component, ...resRoute } = props;


    // console.log(Component);


    return (
        <Route {...resRoute} render={(propsRoute) => {
            return (<>
                <Layout>
                    <Sider width={Math.round(width / 2)} style={{ height: Math.round(height), backgroundImage: `url(https://picsum.photos/${Math.round(width / 2)}/${Math.round(height)})`, backgroundSize: '100%' }}></Sider>

                    <Layout>
                        <Content>
                            <Component {...propsRoute} />
                        </Content>
                    </Layout>


                </Layout>
            </>);
        }} ></Route>
    )
}
