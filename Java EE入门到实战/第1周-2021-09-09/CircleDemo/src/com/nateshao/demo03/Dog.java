package com.nateshao.demo03;

/**
 * @date Created by 邵桐杰 on 2021/9/9 21:17
 * @微信公众号 千羽的编程时光
 * @个人网站 www.nateshao.cn
 * @博客 https://nateshao.gitee.io
 * @GitHub https://github.com/nateshao
 * @Gitee https://gitee.com/nateshao
 * Description: 狗狗类
 */
public class Dog extends Animal {

    private final String xiaobai = "小白";


    public String feed(String name) {
        if (name.equals(xiaobai) ) {
            return "小白";
        }
        return "小黑";
    }

    private final String FOOD = "bone";

    public void eat(String s) {
        if (s == FOOD) {
            System.out.println("大黑爱吃bone");
        } else {
            System.out.println("小黑不喜欢吃fish");
        }
    }

    @Override
    public String feed() {
        return "小白和小黑";
    }
}
