package com.nateshao.demo03;

/**
 * @date Created by 邵桐杰 on 2021/9/9 21:17
 * @微信公众号 千羽的编程时光
 * @个人网站 www.nateshao.cn
 * @博客 https://nateshao.gitee.io
 * @GitHub https://github.com/nateshao
 * @Gitee https://gitee.com/nateshao
 * Description: 猫猫类
 */
public class Cat extends Animal{
    private final String FOOD = "fish";

    public void eat(String s) {
        if (s == FOOD) {
            System.out.println("小白爱吃fish");
        }else {
            System.out.println("小花不喜欢吃bone");
        }
    }

    @Override
    public String feed() {
        return "小猫";
    }
}
