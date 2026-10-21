package com.calculadora.calculadora;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class CalculadoraController{
    @GetMapping("/somar")
    public double somar(@RequestParam double a, @RequestParam double b){
      return a + b;
    }
    @GetMapping("/subtrair")
    public double subtrair(@RequestParam double a, @RequestParam double b){
      return a - b;
    }
    @GetMapping("/multiplicar")
    public double multiplicar(@RequestParam double a, @RequestParam double b){
      return a * b;
    }
    @GetMapping("/dividir")
    public String dividir(@RequestParam double a, @RequestParam double b){
        if (b == 0){
            return "Erro: não é possível dividir por zero.";
        }
        return String.valueOf(a/b);
    }
}