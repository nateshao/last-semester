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

    private String name;
    private Food food;
    private Dog dog;

    public static void main(String[] args) {
        Fish fish = new Fish();
        Bone bone = new Bone();
        Dog dog = new Dog();
        Master master = new Master();
        master.feed("苏大爷", bone, dog);

        Cat cat = new Cat();
        cat.eat("fish");

        dog = new Dog();
        dog.eat("xiaobai");

        master.feed("张大爷", fish, cat);
        cat.eat("xiaohua");
        dog.eat("bone");

    }

    public void feed(String name, Food food, Animal animal) {
        if (food instanceof Bone) {
            System.out.println(name + "投喂" + food.feed() + animal.feed());
        } else {
            System.out.println(name + "投喂" + food.feed() + animal.feed());
        }
    }
}


