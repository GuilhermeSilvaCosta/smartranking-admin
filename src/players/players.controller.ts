import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  private readonly logger = new Logger(PlayersController.name);

  @EventPattern('create-player')
  createPlayer(@Payload() player: Player): Promise<Player> {
    this.logger.log(`player: ${JSON.stringify(player)}`);
    return this.playersService.createPlayer(player);
  }

  @MessagePattern('search-players')
  getPlayers(@Payload() { email }) {
    this.logger.log(`email: ${email}`);
    return this.playersService.searchPlayer(email);
  }

  @MessagePattern('get-player')
  getPlayer(@Payload() id: string) {
    this.logger.log(`id: ${id}`);
    return this.playersService.getPlayer(id);
  }

  @EventPattern('update-player')
  updatePlayer(@Payload() data: any) {
    const { id, player } = data;
    this.logger.log(`id: ${id}`);
    return this.playersService.updatePlayer(id, player);
  }

  @EventPattern('delete-player')
  deletePlayer(@Payload() id: string) {
    this.logger.log(`id: ${id}`);
    return this.playersService.deletePlayer(id);
  }
}
