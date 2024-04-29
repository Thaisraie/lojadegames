import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

// Decorador pois a classe será usada em outras para criar, atualizar e logar pois irá comparar a senha. 
@Injectable()
export  class Bcrypt{

    // Método criptografar recebe a senha digitada, define os saltos dentro da string, método hash criptografa a senha.
    async criptografarSenha(senha: string): Promise<string>{

        let saltos: number = 10
        return await bcrypt.hash(senha, saltos);

    }

    // Método recebe senha do banco de dados criptografada e senha de login. Método compareSync compara senha criptografada com a senha digitada se der math libera o acesso.
    async compararSenhas(senhaBanco: string, senhaDigitada: string): Promise<boolean>{
    
        return bcrypt.compareSync(senhaDigitada, senhaBanco);       
    }
}