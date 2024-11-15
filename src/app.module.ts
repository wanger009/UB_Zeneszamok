import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [SongsModule, PlaylistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
