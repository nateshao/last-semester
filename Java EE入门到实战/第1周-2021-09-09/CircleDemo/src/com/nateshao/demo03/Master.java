package com.nateshao.demo03;

/**
 * @date Created by 邵桐杰 on 2021/9/9 21:14
 * @微信公众号 千羽的编程时光
 * @个人网站 www.nateshao.cn
 * @博客 https://nateshao.gitee.io
 * @GitHub https://github.com/nateshao
 * @Gitee https://gitee.com/nateshao
 * Description: 主人类
 */
public class Master {

//    public void feed(String name, String food) {
////        System.out.println(name + "投喂" + food + "小白和小黑");
//    }

    private String name;
    private Food food;

    public static void main(String[] args) {
        Bone bone = new Bone();
        Master master = new Master();
        master.feed("苏大爷", bone);

    }

    public void feed(String name, Food food) {
        if (food instanceof Bone)
            System.out.println(name + "投喂" + food.feed() + "给小白和小黑");
//        food.feed();
    }
}


