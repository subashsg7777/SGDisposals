        package com.subash.sgdisposals.controller;

        import com.subash.sgdisposals.dto.CollectReqDto;
        import com.subash.sgdisposals.dto.CollectedResDto;
        import com.subash.sgdisposals.service.ICollectorService;
        import com.subash.sgdisposals.service.IRequestService;
        import com.subash.sgdisposals.service.IUserService;
        import com.subash.sgdisposals.service.implementation.RequestService;
        import jakarta.validation.Valid;
        import lombok.RequiredArgsConstructor;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

        import java.util.Map;

        @RestController
        @RequestMapping("api/v1/collector")
        @RequiredArgsConstructor
        public class CollectorController {

            private final ICollectorService collectorService;
            private final RequestService requestService;

            @PutMapping("collected")
            public ResponseEntity<CollectedResDto> markAsCollected(@RequestParam Long id, @RequestParam Long user_id){

                CollectedResDto map = collectorService.markAsCollected(id, user_id);
                return ResponseEntity.status(HttpStatus.OK).body(map);
            }

            @PutMapping("collect")
            public ResponseEntity<CollectedResDto> collectWaste(@Valid @RequestBody CollectReqDto collectReqDto){
                Long points = requestService.collectRequest(collectReqDto);

                CollectedResDto map = collectorService.markAsCollected(collectReqDto.getCollection_id(), collectReqDto.getCollector_id());
                map.setPoints(points);
                return ResponseEntity.status(HttpStatus.OK).body(map);
            }
        }
